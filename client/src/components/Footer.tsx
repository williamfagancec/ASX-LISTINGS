import { Button } from "@/components/ui/button";
import { Mail, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-accent rounded-md flex items-center justify-center">
                <span className="text-accent-foreground font-bold text-sm">ASX</span>
              </div>
              <span className="text-xl font-semibold">Gateway</span>
            </div>
            <p className="text-primary-foreground/80 mb-4">
              Accelerating your journey to IPO success through expert guidance and community support.
            </p>
            <div className="flex gap-2">
              <Button size="icon" variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/10" data-testid="social-linkedin">
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/10" data-testid="social-twitter">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/10" data-testid="social-email">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 className="font-semibold mb-4">Platform</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><Button variant="ghost" className="p-0 h-auto text-primary-foreground/80 hover:text-primary-foreground" data-testid="footer-founder-network">Founder Network</Button></li>
              <li><Button variant="ghost" className="p-0 h-auto text-primary-foreground/80 hover:text-primary-foreground" data-testid="footer-expert-videos">Expert Videos</Button></li>
              <li><Button variant="ghost" className="p-0 h-auto text-primary-foreground/80 hover:text-primary-foreground" data-testid="footer-advisers">Find Advisers</Button></li>
              <li><Button variant="ghost" className="p-0 h-auto text-primary-foreground/80 hover:text-primary-foreground" data-testid="footer-resources">Resources</Button></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><Button variant="ghost" className="p-0 h-auto text-primary-foreground/80 hover:text-primary-foreground" data-testid="footer-help-center">Help Center</Button></li>
              <li><Button variant="ghost" className="p-0 h-auto text-primary-foreground/80 hover:text-primary-foreground" data-testid="footer-contact">Contact Us</Button></li>
              <li><Button variant="ghost" className="p-0 h-auto text-primary-foreground/80 hover:text-primary-foreground" data-testid="footer-community">Community Guidelines</Button></li>
              <li><Button variant="ghost" className="p-0 h-auto text-primary-foreground/80 hover:text-primary-foreground" data-testid="footer-feedback">Give Feedback</Button></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><Button variant="ghost" className="p-0 h-auto text-primary-foreground/80 hover:text-primary-foreground" data-testid="footer-privacy">Privacy Policy</Button></li>
              <li><Button variant="ghost" className="p-0 h-auto text-primary-foreground/80 hover:text-primary-foreground" data-testid="footer-terms">Terms of Service</Button></li>
              <li><Button variant="ghost" className="p-0 h-auto text-primary-foreground/80 hover:text-primary-foreground" data-testid="footer-disclaimer">Disclaimer</Button></li>
              <li><Button variant="ghost" className="p-0 h-auto text-primary-foreground/80 hover:text-primary-foreground" data-testid="footer-cookies">Cookie Policy</Button></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center text-primary-foreground/60">
          <p>&copy; 2025 The Customer Experience Company Pty Ltd, licenced to ASX Limited.</p>
        </div>
      </div>
    </footer>
  );
}