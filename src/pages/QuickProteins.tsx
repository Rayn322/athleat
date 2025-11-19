import { QuickAddItem } from "../components/QuickAddItem";
import { useNavBar } from "../context/NavBarContext";

export default function QuickProteins() {
  const { setUseNotifCartIcon } = useNavBar();

  const handleAddToCart = (name: string) => {
    console.log(`Added ${name} to cart`);
    setUseNotifCartIcon(true); // turns on the notif icon
  };

  return (
    <div className="mt-4 space-y-13">
      <div className="space-y-1">
        <h1 className="text-h1">quick proteins</h1>
        <p className="text-sm">Add proteins to your next grocery trip.</p>
      </div>
      <section className="space-y-4">
        <QuickAddItem
          name="protein bar"
          imageSrc="/Images/bar.png"
          onAdd={() => handleAddToCart("protein shake")}
        />
        <QuickAddItem
          name="chicken breast"
          imageSrc="/Images/chickenBreast.png"
          onAdd={() => handleAddToCart("protein shake")}
        />
        <QuickAddItem 
          name="protein shake" 
          imageSrc="/Images/shake.png"
          onAdd={() => handleAddToCart("protein shake")} />
      </section>
    </div>
  );
}
