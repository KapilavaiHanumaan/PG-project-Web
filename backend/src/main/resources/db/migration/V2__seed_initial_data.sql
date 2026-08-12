-- =============================================================================
-- SEED DATA: ROLES, AMENITIES, REWARDS & ACHIEVEMENTS
-- =============================================================================

INSERT INTO roles (name) VALUES 
('ROLE_STUDENT'),
('ROLE_WORKING_PROFESSIONAL'),
('ROLE_PG_OWNER'),
('ROLE_ADMIN');

INSERT INTO amenities (name, icon) VALUES 
('300Mbps High-Speed Wi-Fi', 'Wifi'),
('Attached Washroom', 'Bath'),
('AC Rooms', 'Wind'),
('3-Times South & North Meal', 'Utensils'),
('24/7 CCTV & Security', 'Shield'),
('Automatic Washing Machine', 'Shirt'),
('24/7 Power Backup Generator', 'Zap'),
('Gym & Fitness Zone', 'Dumbbell'),
('Biometric Entrance Gate', 'Lock'),
('Elevator Lift', 'Building');

INSERT INTO rewards (title, provider, category, cost_points, rupee_value, image_url, description, instructions) VALUES 
('Swiggy ₹50 Food Voucher', 'Swiggy', 'food', 500, 50, 'https://images.unsplash.com/photo-1504674900247-0877df9cc836', 'Get ₹50 flat discount on any food order in Hyderabad.', 'Valid on Swiggy App for 3 months.'),
('Zomato ₹100 Dining Coupon', 'Zomato', 'food', 950, 100, 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5', 'Claim ₹100 off on dining or online food delivery.', 'Valid on Zomato Gold & regular delivery.'),
('Hyderabad Metro Smart Card Recharge ₹100', 'L&T Hyderabad Metro', 'travel', 1000, 100, 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957', 'Instant ₹100 recharge credited to your metro card.', 'Applicable on Red, Blue & Green Metro Lines.'),
('Rapido Bike Taxi ₹50 Ride Discount', 'Rapido', 'travel', 450, 50, 'https://images.unsplash.com/photo-1558981806-ec527fa84c39', 'Flat ₹50 discount on bike taxi commute.', 'Valid for 5 rides in Gachibowli & HITECH City.'),
('Amazon ₹250 Shopping Gift Card', 'Amazon Pay', 'shopping', 2400, 250, 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e', 'Add ₹250 directly to Amazon Pay wallet.', 'Claim code on Amazon Pay gift card section.');

INSERT INTO achievements (name, category, description, xp_reward, icon) VALUES 
('First Review', 'reviewer', 'Published your first verified PG review', 50, 'FileText'),
('5 Verified Reviews', 'reviewer', 'Published 5 verified resident reviews', 200, 'ShieldCheck'),
('25 Helpful Votes', 'community', 'Earned 25 upvotes from fellow residents', 150, 'ThumbsUp'),
('Fraud Fighter', 'community', 'Reported a fake review verified by admins', 100, 'ShieldAlert'),
('Trusted Resident', 'reviewer', 'Achieved 90+ Trust Score on 3 reviews', 300, 'Award');
