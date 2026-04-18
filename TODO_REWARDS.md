# Backer Rewards System

## Current Status
✅ Create/Edit: Dynamic rewards (title/desc/min_amount)
✅ ProjectDetail: RewardTiers.jsx (cards, unlocked, countdowns)
✅ Backend: getProjectRewards, webhook increment_reward_backers

## Gaps for Full Production
- Reward quantity/claimed count (limited/sold-out)
- Select reward → set amount in ContributionModal
- Backend validation claimed < limit
- Creator dashboard reward analytics

## Steps (0/5)
- [ ] 1. Backend: Add quantity/claimed to rewards schema, getRewards w/ availability
- [ ] 2. RewardTiers.jsx: Select handler → open modal w/ reward_id/amount
- [ ] 3. ContributionModal: Reward dropdown, min validation
- [ ] 4. CreatorDashboard: Reward performance table
- [ ] 5. Git push frontend/backend

**Next**: Backend schema/API for quantity tracking

