"use strict";
const chatMessage = document.getElementById('message');
const chatMessageSpinnerWrapper = document.getElementById('chat-spinner-wrapper');
const deleteChatBtn = document.querySelectorAll('.delete-chat-btn');
const chatSpinnerWrapper = document.getElementById('chat-spinner-wrapper');
deleteChatBtn.forEach((btn) => {
    const makeChatSpinnerWrapperVisible = () => {
        setTimeout(() => {
            setVisibility(chatSpinnerWrapper, false);
        }, 500);
    };
    btn.addEventListener('click', () => {
        setVisibility(chatSpinnerWrapper, true);
        POSTRequest('/home', { chatMessageId: btn.id }, (responseData) => {
            if (responseData !== 'false') {
                const messagesWrapper = document.getElementById('messages-wrapper');
                messagesWrapper.removeChild(btn.parentElement.parentElement);
                makeChatSpinnerWrapperVisible();
            }
            else {
                makeChatSpinnerWrapperVisible();
            }
        });
    });
});
window.addEventListener('load', () => {
    if (document.getElementById('admin-wrapper')) {
        const adminAlert = document.getElementById('admin-alert');
        adminAlert.style.display = 'block';
        setTimeout(() => {
            adminAlert.style.display = 'none';
        }, 8000);
    }
    scrollToLastChat();
});
const clearChatMessage = () => setValue(chatMessage, '');
const storeChatMessage = () => {
    const serverError = document.getElementById('sever-error');
    setVisibility(chatMessageSpinnerWrapper, true);
    POSTRequest('/home', { chat: chatMessage.value.trim() }, (responseData) => {
        if (!responseData) {
            setTimeout(() => {
                setVisibility(chatMessageSpinnerWrapper, false);
                setVisibility(serverError, true);
                clearChatMessage();
            }, 500);
        }
        else {
            scrollToLastChat();
            setTimeout(() => {
                setVisibility(chatMessageSpinnerWrapper, false);
                clearChatMessage();
            }, 500);
        }
    });
};
const clearChat = () => {
    const chatMessagesWrapper = document.getElementById('messages-wrapper');
    setInnerHTML(chatMessagesWrapper, '');
    alert('Chat was cleared! But do not worry; once you refresh the page, past chats will be re-populated.');
};
const scrollToLastChat = () => {
    const chatMessages = document.querySelectorAll('.message-wrapper');
    chatMessages[chatMessages.length - 1].scrollIntoView({ behavior: 'smooth' });
};
