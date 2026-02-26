import SupportLetters from '../grantportal/SupportLetters';
import { TrustBadge } from '../grantportal/TrustBadge';

export default function MarketingView() {
    return (
        <div className="min-h-screen bg-neutral-900 flex flex-col items-center py-20 px-4">
            <div className="max-w-4xl w-full space-y-20">
                <section className="text-center space-y-6">
                    <TrustBadge status="verified" />
                    <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter">
                        FARMSENSE
                    </h1>
                    <p className="text-xl text-neutral-400 font-medium max-w-2xl mx-auto">
                        The industrial operating system for deterministic agriculture.
                        Autonomous hardware. Real-time spatial intelligence. Verified integrity.
                    </p>
                </section>

                <SupportLetters />
            </div>
        </div>
    );
}
