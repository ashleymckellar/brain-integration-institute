const Notifications = () => {
    // Array of any message objects/children
    let messages = []
    // Variable to handle when the user has no unread messages in their inbox 
    const doesNotHaveMessages = () => {
        return (
            <AdvancedImage cld={`notification_bell`}/>
        )
    }
    // Variable to handle when the user has unread messages in their inbox 
    // with an overlain text to indicate how many they have. 
    const doesHaveMessages = () => {
        return (
        <AdvancedImage cld={`notification_bell`}/>
        /* {
        transformations: [
            {overlay: `assets: circle_yellow`},
            {overlay: {text:`${messages.length}`}},
            {flags: 'layer_apply', gravity: 'north_east'}
        ]} */
       )
    }

    
    // Ternary Condiditonal which will render either an AdvancedImage of a blank message bell icon
    // or an AdvancedImage message bell icon with an overlayed yellow circle with the .length number
    // of the 'messages' array within with black text.
    let notifications = messages.length > 0 ? {doesHaveMessages} : {doesNotHaveMessages}
    return(
        <div>
            {notifications}
        </div>
    )
}
export {Notifications}