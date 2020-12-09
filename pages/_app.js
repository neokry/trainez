import "../css/index.css";
import "react-activity-feed/dist/index.css";
import { ProvideAuth } from "../hooks/useAuth";
import { ProvideStream } from "../hooks/useStream";

function MyApp({ Component, pageProps }) {
    return (
        <ProvideStream>
            <ProvideAuth>
                <Component {...pageProps} />
            </ProvideAuth>
        </ProvideStream>
    );
}

export default MyApp;
