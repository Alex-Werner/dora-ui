import React from "react";

import { UnorderedList, OrderedList } from "../Styles";

export default () => {
  return (
    <>
      <h2>What is Dora?</h2>
      <p>
        Dora is a Dash Contract for storing frontend code (HTML or React
        Components) in the Dash Platform, and a UI for displaying that frontend
        code with the Dash Platform integrated. The UI will work with HTTP-like
        URL's using DPNS (e.g. mywebsite.dash).
      </p>
      <p>
        The Dora UI will be available as an Electron desktop app, a Progressive
        Web App and as a standard website.
      </p>
      <p>While somewhat inefficient, doing this has the following benefits:</p>
      <UnorderedList>
        <li>
          <strong>100% censorship-resistant</strong> - websites and domains can
          be blocked or taken down at the request of the Chinese CCP or other
          authoritarian governments. The Dash platform cannot.
        </li>
        <li>
          <strong>Safer for end users</strong> - A single wallet for all Dapps
          and a consistent user interface - no need to trust individual Dapp
          creators
        </li>
        <li>
          <strong>Better developer experience</strong> - Build Dapps using tools
          you already use, without having to get into the nitty gritty of the
          Dash Platform
        </li>
      </UnorderedList>
      <h2>Going further... connecting the dots</h2>
      <p>
        Once we've got the basic implementation of Dora working, it makes sense
        to then:
      </p>
      <OrderedList>
        <li>
          Add a contract designer into the Dora UI to allow easier Dapp
          Development
        </li>
        <li>
          A "create-react-app"-like tool that makes building a fully-featured
          Dapp almost as simple as building any React website
        </li>
        <li>
          This can then allow NPM-like component libraries, all hosted within
          the Dash Platform. Micropayments for using these components could be a
          good way to fund developers working within the platform
        </li>
      </OrderedList>
      <p>
        The end result of this is a new layer of internet. Uncensorable,
        transparent, easily extendable and with a lightning-fast, decentralized
        payment layer fully baked in.
      </p>
    </>
  );
};
