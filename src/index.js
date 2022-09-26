import configuration from "./configuration";
import Server from "./server";

const server = new Server(configuration);

server.bootstrap();
server.run();