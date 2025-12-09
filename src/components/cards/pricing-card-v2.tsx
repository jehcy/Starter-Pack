import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/cards/card';
import Link from 'next/link';

interface PricingCardV2Props {
  tier: string;
  description: string;
  price: string;
  period?: string;
  buttonText: string;
  buttonHref?: string;
  buttonDisabled?: boolean;
  comingSoon?: boolean;
}

export function PricingCardV2({
  tier,
  description,
  price,
  period,
  buttonText,
  buttonHref = '/sign-up',
  buttonDisabled = false,
  comingSoon = false,
}: PricingCardV2Props) {
  return (
    <Card className="relative overflow-hidden border-border/50 bg-card hover:border-primary/30 transition-all duration-300">
      {comingSoon && (
        <div className="absolute top-0 right-0">
          <div className="bg-foreground text-background text-xs font-semibold px-4 py-1.5 transform rotate-45 translate-x-8 translate-y-2 origin-top-left">
            Coming soon
          </div>
        </div>
      )}
      <CardContent className="p-8 flex flex-col h-full">
        <h3 className="font-bold mb-4">{tier}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-8 flex-1">
          {description}
        </p>
        <div className="mb-8">
          <span className="text-5xl font-bold">{price}</span>
          {period && <span className="text-muted-foreground text-lg">{period}</span>}
        </div>
        <Button
          className="w-full h-12 rounded-full"
          variant={buttonDisabled ? 'outline' : 'default'}
          disabled={buttonDisabled}
          asChild={!buttonDisabled}
        >
          {buttonDisabled ? (
            <span>{buttonText}</span>
          ) : (
            <Link href={buttonHref}>{buttonText}</Link>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
