song=fs.readFileSync("files/test.spc");
spc=allocate(song, 'i8', ALLOC_STACK);
_my_init(spc,song.length);
buf_size=16384;
buf=allocate(new Uint8Array(buf_size*2), 'i8', ALLOC_STACK);
data=new Buffer(buf_size*2);


while(1){
_my_decode(buf,buf_size);

for(var i=0;i<buf_size*2;i++){
  data[i]=HEAP8[buf+i];
}

fs.appendFileSync("out.pcm",data);
}
