class CustomMentionConfig  {

    usersList: [];
    pluginConfig: any;

    constructor(usersList) {
        this.usersList = usersList;
        this.pluginConfig = {
            allowSpace: false,
            hashtagTrigger: "#",
            zIndex: 30,
            users: Object.assign([],usersList),
            getSuggestions: this.getSuggestions,
            getSuggestionsHTML: (items, type) => {
                if (type === 'mention') {
                    return this.getMentionSuggestionsHTML(items);
                } else if (type === 'tag') {
                    return this.getTagSuggestionsHTML(items);
                } else {
                    return null;
                }
            },
        };
    }

    /**
 * IMPORTANT: outer div's "suggestion-item-list" class is mandatory. The plugin uses this class for querying.
 * IMPORTANT: inner div's "suggestion-item" class is mandatory too for the same reasons
 */
    getMentionSuggestionsHTML = (items) =>
        '<div class="suggestion-item-list">' +
        items
            .map((i:any) => '<div class="suggestion-item"><div class="avatar-mention" style="background:url('+i.image+')"></div><span>' + i.name + '</span></div>')
            .join('') +
        '</div>';

    /**
    * IMPORTANT: outer div's "suggestion-item-list" class is mandatory. The plugin uses this class for querying.
    * IMPORTANT: inner div's "suggestion-item" class is mandatory too for the same reasons
    */
    getTagSuggestionsHTML = (items) =>
        '<div class="suggestion-item-list">' +
        items
            .map((i) => '<div class="suggestion-item">' + i.tag + '</div>')
            .join('') +
        '</div>';

    getSuggestions = (type, text, done) => {

        if (type === 'mention') {
            // autocomplete : filter list from text and return 30 users
            let userList = Object.assign([],this.usersList);

            done(
                text ? userList
                    .filter((x: any) => x.name.toLowerCase().includes(text.toLowerCase()))
                    .splice(0, 5) : userList.splice(0, 30)
            );
        } else {
            // pass dummy tag suggestions
            done([
                {
                    tag: 'WikiLeaks',
                },
                {
                    tag: 'NetNeutrality',
                },
            ]);
        }

    };
    


}

export default CustomMentionConfig;