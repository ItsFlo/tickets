import HttpDispatcher from "../../../modules/HttpDispatcher.js";
import TicketConfig from "../../TicketConfig.js";

class ItemDeleteDispatcher extends HttpDispatcher {
	request(sPath, request, response, oPost) {
		if(sPath) {
			response.writeHead(404);
			response.end();
			return;
		}
		let iID = parseInt(oPost.id);
		if(isNaN(iID)) {
			response.writeHead(400);
			response.end("No id provided");
			return;
		}

		TicketConfig.db.item.delete(iID, (err) => {
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

export default ItemDeleteDispatcher;