/* Talha Runner Illustrator — Illustrator ExtendScript host. */
function talhaRunnerExecute(source) {
    try {
        var result = eval(String(source));
        return JSON.stringify({ok:true,result:result===undefined?"":String(result)});
    } catch (e) {
        return JSON.stringify({ok:false,error:String(e),line:e.line||null});
    }
}
