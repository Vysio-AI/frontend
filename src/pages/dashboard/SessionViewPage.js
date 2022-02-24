import { useParams } from "react-router-dom";

export default function SessionViewPage() {
    const { sessionId } = useParams();

    return (
        <div>
            View session with ID: {sessionId}
        </div>
    )
}