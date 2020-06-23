# Changelog
The goal of this changelog is to track all changes made and to stand as the record of work completed. This project doesn't adhere to Semver. Instead the "patch" version is updated daily, "minor" weekly and the major only for major release events.

## 0.0.6 - 2020/06/22
1. Refactor to make reducer structure match the underlying (all wallet data within wallet reducer) and added immutable to make it usable
2. Got account management working again and identity balance updating at correct times

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
