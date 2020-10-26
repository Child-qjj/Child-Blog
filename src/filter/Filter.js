export function msgDateFormat(msg){
        msg = new Date(msg);
        var y=msg.getFullYear();
        var m=(msg.getMonth()+1).toString().padStart(2,"0");
        var d=msg.getDate();
        var h=msg.getHours().toString().padStart(2,"0");
        var s=msg.getMinutes().toString().padStart(2,"0");
        var ss=msg.getSeconds().toString().padStart(2,"0");
        return y+'-'+m+'-'+d+" "+h+":"+s+":"+s;
}
export function renderHtml(content){
     console.log(content);
}