import Ajax from "../Ajax.js";

const API_ENDPOINT = "/api/venue";

function create(name, date, time) {
	if(!name || !date || !time) {
		return null;
	}

	let requestBody = {
		name: name,
		date: date,
		time: time,
	};

	return Ajax.sendJson(API_ENDPOINT, Ajax.PUT, requestBody);
}


function deleteVenue(id) {
	id = parseInt(id);
	if(isNaN(id)) {
		return null;
	}

	let requestBody = {
		id: id,
	};

	return Ajax.sendJson(API_ENDPOINT, Ajax.DELETE, requestBody);
}


function update(id, sName, sDate, sTime) {
	let requestBody = {
		id: id,
	}

	let hasChanges = false;
	if(sName) {
		requestBody.name = sName;
		hasChanges = true;
	}
	if(sDate) {
		requestBody.date = sDate;
		hasChanges = true;
	}
	if(sTime) {
		requestBody.time = sTime;
		hasChanges = true;
	}

	if(!hasChanges) {
		return Promise.reject("No changes set");
	}

	return Ajax.sendJson(API_ENDPOINT, Ajax.PATCH, requestBody);
}



function getAll(withItemCount=false) {
	let path = API_ENDPOINT+"/all";
	let params = {
		itemCount: withItemCount,
		order: "desc",
	};
	path = Ajax.createUrl(path, params);

	return Ajax.send(path, Ajax.GET);
}


export default {
	create,
	delete: deleteVenue,
	update,
	getAll,
};
