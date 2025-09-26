import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import heroImage from "@assets/generated_images/Business_leaders_boardroom_collaboration_1a3b0283.png";

export default function HeroSection() {
  return (
    <section className="relative min-h-[70vh] flex items-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Business leaders collaborating in boardroom" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6">
            Get IPO-Ready
            <span className="text-accent"> Faster</span>
          </h1>
          <p className="text-xl text-primary-foreground/90 mb-8 leading-relaxed">
            Join a supportive ecosystem that connects you with founder networks, 
            delivers expert "pro tips" through videos, and pairs you with accredited 
            advisers to accelerate your path to a successful public launch.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              variant="secondary"
              className="bg-background/95 text-foreground hover:bg-background border-0 backdrop-blur-sm"
              data-testid="button-get-started"
            >
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="bg-background/10 text-primary-foreground border-primary-foreground/30 hover:bg-background/20 backdrop-blur-sm"
              data-testid="button-watch-demo"
            >
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-primary-foreground/20">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-foreground">500+</div>
              <div className="text-sm text-primary-foreground/80">Companies Accelerated</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-foreground">150+</div>
              <div className="text-sm text-primary-foreground/80">Expert Advisers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-foreground">$2.8B+</div>
              <div className="text-sm text-primary-foreground/80">Capital Raised</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}