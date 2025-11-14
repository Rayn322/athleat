import { QuickAddItem } from "../components/QuickAddItem";
import { NavBar } from "../components/NavBar";

export default function Analytics() {
    return (
        <div className="space-y-13 mt-4">
            <div className="space-y-1">
                <h1 className="text-h1">quick proteins</h1>
                <p className="text-sm">
                    Add proteins to your next grocery trip.
                </p>
            </div>
            <section className="space-y-4">
                <QuickAddItem
                    name="Protein Bar"
                    imageSrc="/images/protein-bar.jpg"
                />
                <QuickAddItem
                    name="Protein Bar"
                    imageSrc="/images/protein-bar.jpg"
                />
                <QuickAddItem
                    name="Protein Bar"
                    imageSrc="/images/protein-bar.jpg"
                />
                <QuickAddItem
                    name="Protein Bar"
                    imageSrc="/images/protein-bar.jpg"
                />
            </section>
            <NavBar active="analytics" />
        </div>
    );
}