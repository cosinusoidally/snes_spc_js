song=fs.readFileSync("files/test.spc");
spc=allocate(song, 'i8', ALLOC_STACK);
_my_init(spc,song.length);
frame_size=16384;
buf_size=frame_size*4;
buf=allocate(new Uint8Array(buf_size), 'i8', ALLOC_STACK);
data=new Buffer(buf_size);

out=fs.openSync("out.pcm","a");
left=new Int16Array(frame_size);
while(1){
_my_decode(buf,frame_size*2);
left_count=0;
for(var i=0;i<buf_size;i=i+4){
//left
  left[left_count]=HEAP16[buf+i/2];
  data[i]=HEAP8[buf+i];
  data[i+1]=HEAP8[buf+i+1];
  left_count++;
//right
  data[i+2]=HEAP8[buf+i+2];
  data[i+3]=HEAP8[buf+i+3];
}
fs.writeSync(out,data,null,data.length);
}
