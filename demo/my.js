song=fs.readFileSync("files/test.spc");
spc=allocate(song, 'i8', ALLOC_STACK);
_my_init(spc,song.length);
buf_size=2048;
buf=allocate(new Uint8Array(buf_size*2), 'i8', ALLOC_STACK);
_my_decode(buf,buf_size);
