song=fs.readFileSync("files/test.spc");
spc=allocate(song, 'i8', ALLOC_STACK);
_my_init(spc,song.length);
frame_size=16384;


frame_size=16384;
in_rate=32000;
out_rate=44100;
initial_offset=0;
ratio=in_rate/out_rate;
final_offset=frame_size*ratio;
last_sample=1+Math.floor(final_offset);
var chan=0;
sample=function(x){
  offset=initial_offset+ratio*x;
  buffer_offset=Math.floor(offset);
  if(buffer_offset+1>last_sample){throw "error";};
  high=offset-buffer_offset;
  low=1-high;
  low_val=HEAP16[buf/2+(buffer_offset+chan)*2]*low;
  high_val=HEAP16[buf/2+(buffer_offset+chan)*2+1]*high;
  return(low_val+high_val);

}



buf_size=4*(last_sample-1);
buf=allocate(new Uint8Array(buf_size+4), 'i8', ALLOC_STACK);
data=new Buffer(frame_size*2);

out=fs.openSync("out.pcm","a");
i16=new Int16Array(1);
while(1){
_my_decode(buf,last_sample*2);
chan=1;
for(var i=0;i<frame_size;i=i+1){
i16[0]=sample(i);
//console.log(sample(i),i16[0]);
data[i*2]=i16[0]&255;
data[i*2+1]=(i16[0]>>>8)&255;
}
//console.log(buffer_offset);
fs.writeSync(out,data,null,data.length);
}
