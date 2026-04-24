import ConversationList from "./list/ConversationList.jsx";
import ChatWindow from "./window/ChatWindow.jsx";

const MessagesPage = () => {
    return (
        <section className="h-screen w-full bg-black overflow-hidden">
            <div className="flex h-full w-full">

                {/* Left Sidebar */}
                <aside className="hidden md:block md:w-1/3 lg:w-1/4 h-full border-r border-r-2 border-orange-500/40 overflow-hidden">
                    <ConversationList />
                </aside>

                {/* Right Chat */}
                <main className="w-full md:flex-1 h-full overflow-hidden">
                    <ChatWindow />
                </main>

            </div>
        </section>
    );
};

export default MessagesPage;