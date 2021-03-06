# Changelog
The goal of this changelog is to track all changes made and to stand as the record of work completed. This project doesn't adhere to Semver. Instead the "patch" version is updated daily, "minor" weekly and the major only for major release events.

## 0.1.0 - 2020/06/24
1. Added transaction listening to FundsRequired component
2. Moved loading wait stage to happen on wallet create and built loading component
3. Added loading screens to create username and import
4. Fixed UI on IdentityManagement, AccountManagement and SelectWizardType for consistency
5. Removed loading indicator from account menu and fixed mobile modal bug
6. Fixed username validation and added help text to import

## 0.0.6 - 2020/06/23
1. Refactor to make reducer structure match the underlying (all wallet data within wallet reducer) and added immutable to make it usable
2. Got account management working again and identity balance updating at correct times
3. Added identity management component, forcing user to select a username if not done so. Also some import bug fixes.
4. Added discard wallet
5. Added view backup phrase
6. UI improvements

## 0.0.5 - 2020/06/21
1. INCOMPLETE Refactor to make reducer structure match the underlying (all wallet data within wallet reducer) and added immutable to make it usable

## 0.0.4 - 2020/06/20
1. Fixed platform credits showing 0 bug
2. Fixed create wallet flow when reloading halfway through
3. Fixed CHANGELOG order
4. INCOMPLETE Refactor to make reducer structure match the underlying (all wallet data within wallet reducer) and added immutable to make it usable

## 0.0.3 - 2020/06/19
1. Removed tooltip for the time being, was painful
2. Fixed getUnusedAddress() development bug where crashed on live reload if account not loaded.
3. Refactored to replace complex localstorage with persist enhancer, added names reducer and refactors names and identities

## 0.0.2 - 2020/06/18
1. Improved styling of account menu and rearranging for next release. Included identity balance and set all elements for next release
2. INCOMPLETE Added Tooltip and Help components to provide info on platform credits

## 0.0.1 - 2020/06/17
1. Changed Dash library to unpkg.com instead of npm to fix bn.js bug
2. Got username creation working
3. Fixed minor bug where the wrong account index was getting selected
4. Built useWindowKeyup hook to capture escape press for modal
5. Built useWindowClick hook to capture click for account menu
6. Fixed active style on account menu
7. INCOMPLETE Improved styling of account menu and rearranging for next release
