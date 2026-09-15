-- ============================================================
-- BULBENI JOBS DATABASE
-- ============================================================

create table if not exists jobs (

    id uuid primary key default gen_random_uuid(),

    title text not null,
    school_name text,
    district text not null,

    teaching_level text,
    teaching_format text,

    description text,

    lessons_per_week integer,
    days_per_week integer,
    lesson_duration integer default 40,

    payment_amount numeric,
    payment_unit text default 'per lesson',
    transportation text,

    start_date date,
    end_date date,

    requirements text,

    application_method text,
    application_contact text,

    application_note text,
    warning text,

    location_details text,
    map_url text,

    status text default 'available',

    created_at timestamptz default now(),
    updated_at timestamptz default now()
);


-- ============================================================
-- SAMPLE JOB
-- We will eventually replace/edit this through the system.
-- ============================================================

insert into jobs (
    title,
    school_name,
    district,
    teaching_level,
    teaching_format,
    description,
    lessons_per_week,
    days_per_week,
    lesson_duration,
    payment_amount,
    payment_unit,
    transportation,
    start_date,
    end_date,
    requirements,
    application_method,
    application_contact,
    application_note,
    warning,
    location_details,
    map_url,
    status
)
values (
    'English Teacher',
    'Orhangazi',
    'Pendik, Istanbul',

    'Middle School',
    'Face-to-face',

    'We are looking for an experienced and reliable English teacher to join a middle school in Pendik for the 2026–2027 academic year.',

    22,
    3,
    40,

    null,
    'per lesson',
    null,

    '2026-10-01',
    '2027-05-31',

    'Experienced and reliable English teacher.',

    'WhatsApp',
    '+905362092947',

    'Please send your introduction video or audio message via WhatsApp to +90 536 209 29 47.',

    'Please check the location on the map carefully before applying. The position runs for around 8 months, so a commute of 60 km each way, for example, would not be a practical arrangement.',

    'Pendik, Istanbul',

    null,

    'available'
);