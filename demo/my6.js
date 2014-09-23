song=fs.readFileSync("files/test.spc");
spc=allocate(song, 'i8', ALLOC_STACK);
_my_init(spc,song.length);
frame_size=16384;


frame_size=16384;
in_rate=32000;
out_rate=48000;
initial_offset=0;
ratio=in_rate/out_rate;
final_offset=frame_size*ratio;
last_sample=1+Math.floor(final_offset);

sample=function(x){
  offset=initial_offset+ratio*x;
  buffer_offset=Math.floor(offset);
  if(buffer_offset+1>last_sample){throw "error";};
  high=offset-buffer_offset;
  low=1-high;
  low_val=HEAP16[buf+buffer_offset*2]*low;
  high_val=HEAP16[buf+buffer_offset*2+1]*high;
  return(low_val+high_val);

}



buf_size=4*(last_sample-1);
buf=allocate(new Uint8Array(buf_size+4), 'i8', ALLOC_STACK);
data=new Buffer(buf_size);

out=fs.openSync("out.pcm","a");
left=new Int16Array(frame_size);
while(1){
_my_decode(buf,last_sample*2);
for(var i=0;i<buf_size;i=i+4){
//left
  data[i]=HEAP8[buf+i];
  data[i+1]=HEAP8[buf+i+1];
//right
  data[i+2]=HEAP8[buf+i+2];
  data[i+3]=HEAP8[buf+i+3];
}
fs.writeSync(out,data,null,data.length);
}
