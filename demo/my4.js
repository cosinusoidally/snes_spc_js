song=fs.readFileSync("files/test.spc");
spc=allocate(song, 'i8', ALLOC_STACK);
_my_init(spc,song.length);
buf_size=16384*4;
buf=allocate(new Uint8Array(buf_size*2), 'i8', ALLOC_STACK);
data=new Buffer(buf_size);

out=fs.openSync("out.pcm","a");

while(1){
_my_decode(buf,buf_size);
for(var i=0;i<buf_size;i=i+2){
  data[i]=HEAP8[buf+i*2+2];
  data[i+1]=HEAP8[buf+i*2+1+2];
}
fs.writeSync(out,data,null,data.length);
}
