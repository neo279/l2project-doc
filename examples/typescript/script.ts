assert_min_version('2.4.1');

Me.PropertyChanged.connect(function (target, args) {
    console.log(args.PropertyName);
}).disconnect();

// Attach some event handlers
globalThis.OnBeforeScriptStop = () => {
    console.log('script stopped')
}
globalThis.OnDie = (objId) => {
    console.log('Something died', objId)
}
