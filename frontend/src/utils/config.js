export const url = `http://localhost:5001`;

let token = localStorage.token;

if (!token)
    token = localStorage.token = Math.random()
        .toString(36)
        .substr(-8);

export const headers = {
      'Accept': 'application/json',
	  'Content-Type':'application/json',
	  'Authorization': token,
	  'Access-Control-Allow-Origin' : '*'
};

