import sha256 from "./sha256";
import bs58 from "./bs58";

export function getWalletIdentities(accounts) {
  return accounts.map(getAccountIdentities);
}

function getAccountIdentities(account) {
  const transactions = Object.keys(account.transactions).map(txid => {
    return {
      hash: txid,
      ...account.transactions[txid]
    };
  });

  const outputs = transactions.reduce((outputs, transaction) => {
    let byteStrIndex;
    const preparedOutputs = transaction.outputs.map((output, index) => {
      byteStrIndex = byteString(index);
      let isBurnOutput = false;
      let txHash = transaction.hash;
      const outPointBuffer = getOutpoint(txHash, byteStrIndex);
      const outputHasTwoChunks = output._script.chunks.length === 2;
      if (outputHasTwoChunks) {
        const isFirstOpcodeOP_RETURN =
          output._script.chunks[0].opcodenum === 106;
        const isSecondOpcodePubKey = output._script.chunks[1].len === 20;
        isBurnOutput = isFirstOpcodeOP_RETURN && isSecondOpcodePubKey;
      }

      return {
        outPointBuffer,
        isBurnOutput: isBurnOutput
      };
    });
    return outputs.concat(preparedOutputs);
  }, []);

  const burnOutputs = outputs.filter(output => output.isBurnOutput);
  const identityIds = burnOutputs.map(
    /*async*/ burnOutput => {
      let hash1 = sha256.arrayBuffer(new Uint8Array(burnOutput.outPointBuffer)); //await crypto.subtle.digest('SHA-256', burnOutput.outPointBuffer);
      let hash2 = sha256.arrayBuffer(new Uint8Array(hash1)); //await crypto.subtle.digest('SHA-256', hash1);
      let identityId = bs58.encode(new Uint8Array(hash2));
      return identityId;
    }
  );

  return identityIds;
}

function byteString(n) {
  if (n < 0 || n > 255 || n % 1 !== 0) {
    throw new Error(n + " does not fit in a byte");
  }
  return ("000000000" + n.toString(2)).substr(-8);
}

function getOutpoint(txHash, byteStrIndex) {
  const outPointHex = txHash + byteStrIndex;

  if (outPointHex.length % 2 !== 0) {
    throw new Error(
      `The outpoint length "${outPointHex}" is not divisible by 2.`
    );
  }

  const fromHexString = hexString =>
    new Uint8Array(hexString.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));

  const outpointBuffer = fromHexString(outPointHex);

  return outpointBuffer;
}
