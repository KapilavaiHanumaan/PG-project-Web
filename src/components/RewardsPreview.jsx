import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Coins, Gift, Utensils, Train, Shirt, ShoppingBag, 
  Sparkles, CheckCircle2, ArrowRight, ShieldCheck, CreditCard, ThumbsUp, Camera, Flag, FileText
} from 'lucide-react';
import { REWARD_ACTIONS, REDEEMABLE_REWARDS } from '../data/mockData';

export default function RewardsPreview({ onClaimReward }) {
  const [userCoins, setUserCoins] = useState(125);
  const [claimedReward, setClaimedReward] = useState(null);

  const iconMap = {
    FileText: FileText,
    Camera: Camera,
    ThumbsUp: ThumbsUp,
    Flag: Flag,
    Utensils: Utensils,
    Train: Train,
    Shirt: Shirt,
    ShoppingBag: ShoppingBag
  };

  const handleRedeem = (item) => {
    if (userCoins >= item.points) {
      setUserCoins(userCoins - item.points);
      setClaimedReward(item.title);
      setTimeout(() => setClaimedReward(null), 4000);
    }
  };

  return (
    <section id="rewards" className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-amber-50 text-amber-800 rounded-full text-xs font-bold border border-amber-200">
            <Coins className="w-4 h-4 text-amber-500" />
            <span>PGCoin Community Economy</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Earn Points for <span className="gradient-text-accent">Authentic Feedback</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Turn your real stay experiences into free food coupons and Hyderabad metro smart card recharges.
          </p>
        </div>

        {/* Highlighted Banner Badge */}
        <div className="mb-12 max-w-2xl mx-auto p-4 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-2xl shadow-lg text-white text-center font-extrabold text-sm sm:text-base flex items-center justify-center gap-3">
          <Sparkles className="w-5 h-5 text-amber-200 animate-spin" />
          <span>"Your reviews can pay for your next metro ride."</span>
          <Sparkles className="w-5 h-5 text-amber-200 animate-spin" />
        </div>

        {/* Main Grid: Left Digital Wallet Earning Chart, Right Redeemable Shop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Digital Wallet Card & Earning Table */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Wallet Header Card */}
            <div className="p-6 bg-gradient-to-br from-slate-900 via-slate-800 to-primary-950 text-white rounded-3xl shadow-2xl border border-slate-700/80 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Coins className="w-40 h-40 text-amber-400" />
              </div>

              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 text-amber-400" /> PGTrust Digital Wallet
                </span>
                <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-400 text-[11px] font-bold rounded-full border border-emerald-500/30">
                  Active Balance
                </span>
              </div>

              <div className="my-3">
                <p className="text-xs text-slate-400 font-semibold">Available Coins</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-black text-amber-400">{userCoins}</span>
                  <span className="text-sm font-bold text-slate-300">PGCoins</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-700/60 flex items-center justify-between text-xs text-slate-300">
                <span>Equivalent Value: <strong>₹{userCoins} INR</strong></span>
                <span className="text-amber-400 font-bold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> Instant Redemption
                </span>
              </div>
            </div>

            {/* Points Earning Table */}
            <div className="p-6 bg-slate-50 rounded-3xl border border-slate-200/80 shadow-md">
              <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center justify-between">
                <span>How to Earn Coins</span>
                <span className="text-xs font-normal text-slate-500">Updated Rates</span>
              </h3>

              <div className="space-y-3">
                {REWARD_ACTIONS.map((item, idx) => {
                  const ActionIcon = iconMap[item.icon] || FileText;
                  return (
                    <div key={idx} className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-200/60 shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary-50 text-primary-600 rounded-lg">
                          <ActionIcon className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900">{item.action}</p>
                          <span className="text-[10px] text-slate-400 font-semibold">{item.badge}</span>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-amber-100 text-amber-900 font-black text-xs rounded-full border border-amber-200">
                        +{item.points} pts
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Redeemable Catalog Cards */}
          <div className="lg:col-span-7 space-y-4">
            
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-extrabold text-slate-900">Redeemable Rewards</h3>
              {claimedReward && (
                <motion.span 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full"
                >
                  Redeemed {claimedReward}! Check SMS code.
                </motion.span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {REDEEMABLE_REWARDS.map((reward, rIdx) => {
                const RewardIcon = iconMap[reward.icon] || Gift;
                const canAfford = userCoins >= reward.points;

                return (
                  <motion.div
                    key={rIdx}
                    whileHover={{ y: -4 }}
                    className="p-5 bg-slate-50 hover:bg-white rounded-3xl border border-slate-200 shadow-md hover:shadow-xl transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="p-3 bg-gradient-to-br from-primary-600 to-secondary-600 text-white rounded-2xl shadow-md">
                          <RewardIcon className="w-6 h-6" />
                        </div>
                        <span className="px-2.5 py-1 bg-amber-100 text-amber-900 font-black text-xs rounded-full">
                          {reward.points} PGCoin
                        </span>
                      </div>

                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                        {reward.category}
                      </span>
                      <h4 className="text-base font-extrabold text-slate-900">{reward.title}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">{reward.provider}</p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-slate-200/60">
                      <button
                        onClick={() => handleRedeem(reward)}
                        disabled={!canAfford}
                        className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 ${
                          canAfford
                            ? 'bg-slate-900 hover:bg-primary-600 text-white shadow-md'
                            : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                        }`}
                      >
                        {canAfford ? (
                          <>
                            <span>Redeem Voucher</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </>
                        ) : (
                          <span>Need {reward.points - userCoins} More Coins</span>
                        )}
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
