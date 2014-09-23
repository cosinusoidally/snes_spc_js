/* Records SPC into wave file. Uses dsp_filter to give more authentic sound.

Usage: play_spc [test.spc]
*/
#include <emscripten.h>

#include "snes_spc/spc.h"

#include "wave_writer.h"
#include "demo_util.h" /* error(), load_file() */
void my_init(void* spc,long spc_size);
void my_decode(short* buf,int buf_size);
SNES_SPC* snes_spc;
SPC_Filter* filter;
//void* spc;
long spc_size;
int main( int argc, char** argv )
{
// mount the current folder as a NODEFS instance
// inside of emscripten
//my_init();
// my_decode();
return 0;
}

void EMSCRIPTEN_KEEPALIVE my_init(void* spc,long spc_size){

	/* Create emulator and filter */
	snes_spc = spc_new();
	filter = spc_filter_new();
	if ( !snes_spc || !filter ) error( "Out of memory" );
	
	/* Load SPC */
	{
		/* Load file into memory */
//		spc = load_file(  "/files/test.spc", &spc_size );
		
		/* Load SPC data into emulator */
		error( spc_load_spc( snes_spc, spc, spc_size ) );
//		free( spc ); /* emulator makes copy of data */
		
		/* Most SPC files have garbage data in the echo buffer, so clear that */
		spc_clear_echo( snes_spc );
		
		/* Clear filter before playing */
		spc_filter_clear( filter );
	}
	}
	/* Record 20 seconds to wave file */

void EMSCRIPTEN_KEEPALIVE my_decode(short* buf,int buf_size){
//	wave_open( spc_sample_rate, "/files/out.wav" );
//	wave_enable_stereo();
//	while ( wave_sample_count() < 20 * spc_sample_rate * 2 )
//	{
		/* Play into buffer */
		#define BUF_SIZE 2048
//		short buf [BUF_SIZE];
		error( spc_play( snes_spc, buf_size, buf ) );
		
		/* Filter samples */
		spc_filter_run( filter, buf, buf_size );
		
//		wave_write( buf, BUF_SIZE );
//	}
	
	/* Cleanup */
//	spc_filter_delete( filter );
//	spc_delete( snes_spc );
//	wave_close();
}	
