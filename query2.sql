-- The average age of the does that
-- gave birth that year.
select
    EXTRACT(YEAR from AF.dob) as birth_year,
    EXTRACT(YEAR from CURRENT_DATE)-EXTRACT(year from dob) as avg_age
from Animal_Facts as AF
join Animal_weight as AW on AF.Animal_id = AW.animal_id
where sex = 'Female'
group by EXTRACT(YEAR from AF.dob);