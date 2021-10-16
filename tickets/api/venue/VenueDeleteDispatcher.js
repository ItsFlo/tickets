import HttpDispatcher from "../../../modules/HttpDispatcher.js";
import TicketConfig from "../../TicketConfig.js";

class VenueDeleteDispatcher extends HttpDispatcher {
	dispatch(sPath, request, response, oPost) {
		if(sPath) {
			response.writeHead(404);
			response.end();
			return;
		}
		if(!oPost.hasOwnProperty("id") || isNaN(parseInt(oPost.id))) {
			response.writeHead(400);
			response.end("No id provided");
			return;
		}

		TicketConfig.db.venue.delete(oPost.id, (err) => {
			if(err) {
				response.writeHead(500);
				response.end(err.message);
			}
			else {
				response.setHeader("Content-Type", "application/json");
				response.writeHead(200);
				response.end("{}");
			}
		});
	}
};

export default VenueDeleteDispatcher;