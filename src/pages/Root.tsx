// src/routes/Root.tsx
import { useState } from "react";
import { Link } from "react-router";
import { ChevronRight, Plus, Check, X, User, Settings } from "lucide-react";
import { AnalyticsBar } from "../components/AnalyticsBar";
import { Button } from "../components/Button";
import { QuickAddItem } from "../components/QuickAddItem";
import { NavBar } from "../components/NavBar";
import { ProgressBar } from "../components/ProgressBar";
import { MealOption } from "../components/MealOption";
import { GroceryItem } from "../components/GroceryItem";
import { Tag } from "../components/Tag";
import { TextBox } from "../components/TextBox";
import { SwipeCards } from "../components/SwipeCard";
import { Checkbox } from "../components/Checkbox";
import { Dropdown } from "../components/Dropdown";
import { ProfileHeading } from "../components/ProfileHeading";
import { ContactCard } from "../components/ContactCard";


export default function Root() {
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({
    "protein bar": false,
    "almonds": true,
    "greek yogurt": false,
  });

  const [textValue, setTextValue] = useState("");

  const handleToggle = (label: string, checked: boolean) => {
    setCheckedItems((prev) => ({ ...prev, [label]: checked }));
  };

  //for ContactCard demo
const [contacts, setContacts] = useState<
  { id: number; name: string; company: string }[]
>([
  { id: 1, name: "Name 1", company: "Company A" },
  { id: 2, name: "Name 2", company: "Company B" },
]);

const addContact = (data: { name: string; company: string }) => {
  const nextId = Math.max(0, ...contacts.map((c) => c.id)) + 1;
  setContacts((prev) => [...prev, { id: nextId, ...data }]);
};

const updateContact = (id: number, data: { name: string; company: string }) => {
  setContacts((prev) => prev.map((c) => (c.id === id ? { ...c, ...data } : c)));
};

const removeContact = (id: number) => {
  setContacts((prev) => prev.filter((c) => c.id !== id));
};

  return (
    <div className="space-y-6">
      <p>This is the main page</p>
      <div className="space-y-4 p-6">
        {/* Default icon (ChevronRight) */}
        <Button variant="primary" showIcon>
          Continue
        </Button>

        {/* Custom icon */}
        <Button variant="primary" width="hug" showIcon icon={<Plus className="h-4 w-4" />} size="sm">
          Add Item
        </Button>

        {/* Left icon */}
        <Button
          variant="outline"
          showIcon
          icon={<Check className="h-5 w-5" />}
          iconPosition="left"
        >
          Confirm
        </Button>

        {/* Disabled visual + actual disabled */}
        <Button variant="disabled" width="hug">
          Disabled
        </Button>

        <QuickAddItem
          name="Protein Bar"
          imageSrc="/images/protein-bar.jpg"
        />

        <NavBar active="home" />
        <NavBar active="analytics" />
        <NavBar active="cart" />

        <NavBar active="home" useNotifCartIcon />
        <NavBar active="analytics" useNotifCartIcon />
        <NavBar active="cart" useNotifCartIcon />
      </div>

      {/* Example Analytics Bars (unchanged) */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Analytics Bars</h2>
        <AnalyticsBar label="Carbs" variant="onTrack" value={55} goal={50} max={100} />
        <AnalyticsBar
          label="Protein"
          variant="low"
          value={20}
          goal={60}
          max={100}
          onQuickAdd={() => alert("Quick Add clicked!")}
        />
      </section>

      {/* Stacked Progress Bars like the screenshot */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Progress Bars</h2>
        <div className="space-y-5 bg-white p-6">
          <ProgressBar value={18}  height={18} className="mb-4" />
          <ProgressBar value={45}  height={18} className="mb-4" />
          <ProgressBar value={68}  height={18} className="mb-4" />
          <ProgressBar value={100} height={18} className="mb-4" />
          <ProgressBar value={30}  height={18} className="mb-4" />
          <ProgressBar value={0}   height={18} className="mb-4" />
          <ProgressBar value={60}  height={18} className="mb-4" />
          <ProgressBar value={72}  height={18} className="mb-4" />
          <ProgressBar value={85}  height={18} className="mb-4" />
        </div>
      </section>

      {/* Example Meal Options */}
      <section className="space-y-6">
        <h2 className="text-lg font-semibold">Meal Options (click to toggle)</h2>
        <MealOption
          title="Cheese Burger"
          imageSrc="/Images/burger.jpg"
          tags={["high protein", "carbs"]}
          ingredients={["Bread", "Patty", "Lettuce", "Tomato", "Cheese", "Pickles"]}
        />

        <MealOption
          title="Cheese Burger"
          imageSrc="/Images/burger.jpg"
          tags={["high protein", "carbs"]}
          ingredients={["Bread", "Patty", "Lettuce", "Tomato", "Cheese", "Pickles"]}
        />
      </section>

      {/* Example Grocery Items */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Grocery Items (click to toggle)</h2>
        <div className="max-w-lg space-y-3 bg-white p-6">
          {Object.entries(checkedItems).map(([label, checked]) => (
            <GroceryItem
              key={label}
              label={label}
              checked={checked}
              onChange={(c) => handleToggle(label, c)}
            />
          ))}
        </div>
      </section>

      {/* Example Swipeable Cards */}
      <section className="space-y-6">
        <h2 className="text-lg font-semibold">Swipeable Food Cards</h2>
        <SwipeCards />
      </section>

      {/* Example Checkbox */}
      <section className="space-y-4 p-6">
        <h2 className="text-lg font-semibold">Checkbox Example</h2>
        <Checkbox />
      </section>

      {/* Example Dropdown */}
      <section className="space-y-4 p-6">
        <h2 className="text-lg font-semibold">Dropdown Example</h2>
        <Dropdown />
      </section>

      {/* Example Profile Headings */}
        <section className="space-y-4 p-6">
  <h2 className="text-lg font-semibold">Profile Heading Example</h2>

  <ProfileHeading
    icon={<Settings className="h-6 w-6 text-black" />}
    text="Account Settings"
  />

  <ProfileHeading
    icon={<User className="h-6 w-6 text-black" />}
    text="Personal Information"
  />
</section>

      {/* Example Contact Cards */}
      <section className="space-y-4 p-6">
  <h2 className="text-lg font-semibold">Contacts</h2>

  <div className="flex items-start gap-3">
    {contacts.map((c) => (
      <ContactCard
        key={c.id}
        name={c.name}
        company={c.company}
        onSave={(data) => updateContact(c.id, data)}
        onRemove={() => removeContact(c.id)}
      />
    ))}

    {/* Add card (empty) */}
    <ContactCard
      onSave={(data) => addContact(data)}
    />
  </div>
</section>


      {/* Example Text Box */}
      <section className="space-y-4 p-6">
        <h2 className="text-lg font-semibold">TextBoxes</h2>
  
        {/* Username */}
        <TextBox
          label="Username"
          placeholder="Enter a username"
          value={textValue}
          onChange={setTextValue}
          variant="unfilled"
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Tags</h2>
        <div className="space-y-5 bg-white p-6">
          {/* green outline */}
          <Tag label="Protein" variant="outline-green" size="lg" />
          <Tag label="Protein" variant="outline-green" size="sm" />

          {/* black outline */}
          <Tag label="Protein" variant="outline-black" size="lg" />
          <Tag label="Protein" variant="outline-black" size="sm" />

          {/* solid black */}
          <Tag label="Protein" variant="black" size="lg" />
          <Tag label="Protein" variant="black" size="sm" />
        </div>
      </section>

      {/* Navigation link */}
      <Link
        to="/other"
        className="flex w-fit gap-2 rounded-3xl bg-green-primary px-4 py-3 text-white hover:opacity-90 active:opacity-80 transition"
      >
        <span>Go to other page</span>
        <ChevronRight />
      </Link>
    </div>
  );
}

