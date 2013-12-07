// Accepts a url and a callback function to run.  
function requestCrossDomain( site, callback ) {  
      
    // If no url was passed, exit.  
    if ( !site ) {  
        alert('No site was passed.');  
        return false;  
    }  
      
    if (!(/^http(s)?:\/\//ig).test(site)) {
        site = 'http://' + site;
    }

    $.getJSON('http://whateverorigin.org/get?url=' + encodeURIComponent(site) + '&callback=?', cbFunc);
      
    function cbFunc(data) {  
        // If we have something to work with...  
        if ( data.contents ) {  
            // Strip out all script tags, for security reasons.  
            // BE VERY CAREFUL. This helps, but we should do more.   
            data = data.contents.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');  
              
            // If the user passed a callback, and it  
            // is a function, call it, and send through the data var.  
            if ( typeof callback === 'function') {  
                callback(data);  
            }  
        }  
        // Else, Maybe we requested a site that doesn't exist, and nothing returned.  
        else throw new Error('Nothing returned from getJSON.');  
    }  
}  