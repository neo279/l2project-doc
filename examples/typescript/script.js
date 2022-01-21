"use strict";
assert_min_version('2.4.1');
Me.PropertyChanged.connect(function (target, args) {
    console.log(args.PropertyName);
}).disconnect();
OnDie = (objId) => {
    console.log('Something died', objId);
};
// FIXME: not sure if we can attach event listener like so,
//   need to find a better way to rewrite this
OnBeforeScriptStop = () => {
    console.log('script stopped');
};
