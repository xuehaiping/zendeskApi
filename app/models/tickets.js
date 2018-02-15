/**
 *  @fileOverview stores tickets for sharing.
 *
 *  @author       Haiping Xue
 */

/**
 * @member ticketList
 * @function
 */
 var tickets = {
     ticketList: null,
     get: function() {
       if(typeof ticketList === 'undefined')
        return undefined;
      else
         return ticketList;
     },
     set: function(list) {
         ticketList = list;
     }
 }

 module.exports = tickets;
