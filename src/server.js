require('dotenv').config();
const Hapi = require('@hapi/hapi');
const albums = require('./api/albums');
const AlbumsService = require('./services/postgres/albums/AlbumsService');
const AlbumsValidator = require('./validator/albums');
const songs = require('./api/songs');
const SongsService = require('./services/postgres/songs/SongsService');
const SongsValidator = require('./validator/songs');

const init = async () => {
  // eslint-disable-next-line no-undef
  const albumService = new AlbumsService();
  const songService = new SongsService();
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register([
    {
      plugin: albums,
      options: {
        service: albumService,
        validator: AlbumsValidator,
      },
    },
    {
      plugin: songs,
      options: {
        service: songService,
        validator: SongsValidator,
      },
    },
  ]);

  await server.start();
  console.log(`Server sedang berjalan pada ${server.info.uri}`);
};

init();
