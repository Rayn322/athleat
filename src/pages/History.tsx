
import { ContactCard } from "../components/ContactCard";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function History() {
    const navigate = useNavigate();
    return (
        <div className="space-y-8">
            <button
                type="button"
                onClick={() => navigate(-1)}
            >
                <ChevronLeft className="h-6 w-6 text-black" />
            </button>
            <h1 className="text-h1">your analytics history</h1>
            <section className="space-y-10 mb-5">
                <div className="space-y-5">

                    <div className="space-y-2">
                        <p className="text-base">diet goal:</p>
                        <p className="text-small"> maintain composition</p>
                    </div>
                    <div className="space-y-2">
                        <p className="text-base">people you share your info with:</p>
                        <div className="flex flex-row space-x-3">
                            <ContactCard
                                name={"coach joel"}
                                company={"cuesta college"}
                            />
                            <ContactCard
                                name={"dr. johnson"}
                                company={"dietitian, doctor"}
                            />
                        </div>
                    </div>
                </div>
                <div className="space-y-5">
                    <img src="Images/carbsGraph.png" alt="protein-graph"/>
                    <img src="Images/proteinGraph.png" alt="protein-graph"/>
                    <img src="Images/fatsGraph.png" alt="protein-graph"/>
                    <img src="Images/fiberGraph.png" alt="protein-graph"/>
                </div>
            </section>
        </div>
    );
}