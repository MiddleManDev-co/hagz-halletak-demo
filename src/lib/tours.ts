import type { Persona } from './demo-state';

/**
 * Guided tours, generated from the `tours` table in navigator.js.
 *
 * Each step names the route to visit, the persona to switch into, and the
 * `Navigator` message key describing what to look at. The tour ids are a
 * published contract — they appear as `?tour=<id>` in DEMO-LINKS.md.
 */
export type TourStep = {
  route: string;
  persona: Persona;
  /** Key inside the `Navigator` namespace. */
  key: string;
};

export type Tour = {
  id: TourId;
  labelKey: string;
  noteKey: string;
  steps: TourStep[];
};

export const TOUR_IDS = [
  'full',
  'customer',
  'venue',
  'admin',
  'investor',
  'business',
] as const;

export type TourId = (typeof TOUR_IDS)[number];

export const TOURS: Record<TourId, Tour> = {
  full: {
    id: 'full',
    labelKey: 'dawwar_tour_about_4_min',
    noteKey: 'from_search_to_booking_and_venue_operations',
    steps: [
      { route: 'home', persona: 'customer', key: 'start_with_the_simple_problem_finding_the' },
      { route: 'explore', persona: 'customer', key: 'here_the_customer_sees_matching_available_places' },
      { route: 'venue/royal-garden', persona: 'customer', key: 'open_a_venue_check_photos_starting_price' },
      { route: 'pilot/request/royal-garden', persona: 'customer', key: 'the_customer_sends_one_clear_request_with' },
      { route: 'pilot/quote/royal-garden', persona: 'customer', key: 'the_venue_replies_with_the_final_price' },
      { route: 'pilot/confirmed', persona: 'customer', key: 'after_the_deposit_goes_directly_to_the' },
      { route: 'venue-os/calendar', persona: 'venue', key: 'this_is_the_important_part_updating_free' },
      { route: 'venue-os/visits', persona: 'venue', key: 'the_venue_team_sees_who_is_coming' },
      { route: 'pilot/commission', persona: 'venue', key: 'the_confirmed_booking_appears_for_the_venue' },
      { route: 'pilot/ops', persona: 'admin', key: 'admin_reviews_venues_dates_bookings_and_fees' },
      { route: 'vision', persona: 'investor', key: 'finish_with_the_features_that_can_come' },
    ],
  },
  customer: {
    id: 'customer',
    labelKey: 'customer_journey_2_min',
    noteKey: 'search_pick_ask_confirm',
    steps: [
      { route: 'home', persona: 'customer', key: 'enter_the_date_area_guest_count_and' },
      { route: 'explore', persona: 'customer', key: 'see_venues_that_fit_and_are_available' },
      { route: 'venue/royal-garden', persona: 'customer', key: 'check_photos_price_and_features_then_ask' },
      { route: 'pilot/request/royal-garden', persona: 'customer', key: 'send_one_clear_request_to_the_venue' },
      { route: 'pilot/quote/royal-garden', persona: 'customer', key: 'see_the_venue_reply_and_final_price' },
      { route: 'pilot/confirmed', persona: 'customer', key: 'after_paying_the_venue_directly_confirm_the' },
    ],
  },
  venue: {
    id: 'venue',
    labelKey: 'venue_team_2_min',
    noteKey: 'dates_requests_visits_bookings',
    steps: [
      { route: 'venue-os/overview', persona: 'venue', key: 'start_with_a_simple_question_what_needs' },
      { route: 'venue-os/calendar', persona: 'venue', key: 'this_is_the_important_part_updating_free' },
      { route: 'venue-os/leads', persona: 'venue', key: 'sales_sees_customer_requests_and_can_reply' },
      { route: 'venue-os/visits', persona: 'venue', key: 'reception_or_security_sees_who_is_coming' },
      { route: 'venue-os/bookings', persona: 'venue', key: 'confirmed_bookings_stay_clear_for_the_whole' },
      { route: 'pilot/commission', persona: 'venue', key: 'finally_the_venue_sees_dawwar_s_fee' },
    ],
  },
  admin: {
    id: 'admin',
    labelKey: 'admin_journey_90_sec',
    noteKey: 'review_follow_up_resolve',
    steps: [
      { route: 'pilot/ops', persona: 'admin', key: 'start_with_the_operations_overview_venues_dates' },
      { route: 'admin/verification', persona: 'admin', key: 'check_venue_details_before_the_venue_appears' },
      { route: 'admin/bookings', persona: 'admin', key: 'if_you_need_to_check_where_a' },
      { route: 'admin/support', persona: 'admin', key: 'any_customer_or_venue_problem_stays_clear' },
    ],
  },
  investor: {
    id: 'investor',
    labelKey: 'business_story_90_sec',
    noteKey: 'problem_value_fee_growth',
    steps: [
      { route: 'home', persona: 'customer', key: 'dawwar_starts_with_a_clear_problem_customers' },
      { route: 'venue-os/overview', persona: 'venue', key: 'venue_tools_keep_dates_and_requests_up' },
      { route: 'pilot/commission', persona: 'venue', key: 'the_first_simple_revenue_stream_is_a' },
      { route: 'vision', persona: 'investor', key: 'after_the_basics_work_subscriptions_payments_and' },
      { route: 'investor', persona: 'investor', key: 'this_is_the_big-picture_vision_not_a' },
    ],
  },
  business: {
    id: 'business',
    labelKey: 'business_intelligence_tour',
    noteKey: 'business_tour_note',
    steps: [
      { route: 'venue-os/business-center', persona: 'venue', key: 'start_with_profit_cash_flow_and_break-even' },
      { route: 'venue-os/revenue-intelligence', persona: 'venue', key: 'see_which_packages_and_days_actually_make' },
      { route: 'venue-os/action-center', persona: 'venue', key: 'turn_analysis_into_actions_ranked_by_value' },
      { route: 'admin/economics', persona: 'admin', key: 'move_to_platform_economics_gmv_take_rate' },
      { route: 'admin/marketplace-health', persona: 'admin', key: 'check_that_growth_is_backed_by_reliable' },
      { route: 'strategy-simulator', persona: 'investor', key: 'finish_with_what-if_pricing_and_growth_scenarios' },
    ],
  },
};

export function isTourId(value: string): value is TourId {
  return (TOUR_IDS as readonly string[]).includes(value);
}
