module.exports = {
    formatDate: (input) => {
        var formattedDate = "";
        const words = (JSON.stringify(input)).split("");

            for(i =1; i < 11; i++){
                formattedDate += words[i]
            }
        return formattedDate
    },

}