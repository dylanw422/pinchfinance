import {
  Brain,
  DollarSign,
  Heart,
  Landmark,
  Layers,
  PiggyBank,
  Repeat2,
  Search,
  Target,
  Trophy,
} from "lucide-react";

const features = [
  {
    icon: <Search className="w-4 h-4" />,
    title: "Insights",
    text: "Get real-time insights on your spending, income, and savings – all powered by Pinch's intelligent analysis.",
  },
  {
    icon: <Target className="w-4 h-4" />,
    title: "Goals",
    text: "Set financial goals like buying a home or paying off debt – and follow a step-by-step plan to get there.",
  },
  {
    icon: <DollarSign className="w-4 h-4" />,
    title: "Cash Flow",
    text: "Track your income and expenses with clarity. Forecast your future and plan ahead with confidence.",
  },
  {
    icon: <Repeat2 className="w-4 h-4" />,
    title: "Subscriptions",
    text: "Easily view, manage, and cancel recurring expenses – no more surprises on your statements.",
  },
  {
    icon: <Layers className="w-4 h-4" />,
    title: "Reports",
    text: "Understand your financial story through powerful visualizations like Sankey charts and spending heatmaps.",
  },
  {
    icon: <Brain className="w-4 h-4" />,
    title: "AI Assistant",
    text: "Pinch AI helps you save smarter, spend wiser, and reach goals faster – like having a money coach in your pocket.",
  },
  {
    icon: <Landmark className="w-4 h-4" />,
    title: "Investing",
    text: "Start small or go big – Pinch helps you invest wisely and stay on track with your financial goals.",
  },
  {
    icon: <Heart className="w-4 h-4" />,
    title: "Credit Health",
    text: "Keep an eye on your credit score and learn how to improve it with personalized tips based on your spending and debt habits.",
  },
  {
    icon: <Trophy className="w-4 h-4" />,
    title: "Rewards",
    text: "Earn rewards for sticking to your financial goals and reaching milestones.",
  },
];

export default function FeaturesSection() {
  return (
    <div id="features" className="relative mx-auto max-w-[80rem] px-6 text-center md:px-8">
      <div className="flex flex-col items-center justify-center space-y-2">
        <PiggyBank />
        <h1 className="text-lg">Everything you need, all in one app.</h1>
        <p className="text-gray-400">
          Actually change your financial situation — dont just track your current one.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 md:gap-8 mt-8">
        {features.map((feature) => {
          return (
            <div key={feature.title} className="border-b p-4 border-gray-400/10">
              <div className="flex items-center gap-2">
                {feature.icon}
                <h2 className="text-lg font-light">{feature.title}</h2>
              </div>

              <p className="text-start text-sm mt-2 text-gray-400">{feature.text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
