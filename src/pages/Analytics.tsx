import { AnalyticsBar } from "../components/AnalyticsBar";
import { useNavigate } from "react-router";

export default function Analytics() {
    const navigate = useNavigate();
    return (
        <div className="space-y-13">
            <h1 className="text-h1">your weekly analytics</h1>
            <div className="mx-auto text-center">
                <img src="Images/analyticsCircle.png" alt="analytics-circle" className="mx-auto"/>
                <a className="text-base underline mt-3" href="/history">
                    view history
                </a>
            </div>
            <section className="space-y-9 mb-5">
                <AnalyticsBar label="Carbs" variant="onTrack" value={55} goal={50} max={100} />
                <AnalyticsBar
                    label="Protein"
                    variant="low"
                    value={20}
                    goal={60}
                    max={100}
                    onQuickAdd={() => navigate("/quickProteins")}
                />
                <AnalyticsBar label="Fats" variant="onTrack" value={50} goal={50} max={100} />
                <AnalyticsBar label="Fiber" variant="onTrack" value={60} goal={50} max={100} />
            </section>
            {/* <NavBar active="analytics" /> */}
        </div>
    );
}