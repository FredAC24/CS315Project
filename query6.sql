with cte as(
   select
       AF.dob,
       CASE
           WHEN AW.last_weight ~ '[0-9]' THEN CAST(AW.last_weight AS decimal)
           else null
       END AS num


   from FirstYearMoms as AF
   join Animal_weight as AW on AF.animal_id = AW.animal_id
UNION ALL
   select
       AF.dob,
       CASE
           WHEN AW.last_weight ~ '[0-9]' THEN CAST (AW.last_weight as decimal)
           else null
       end as NUM
   from OlderMoms as AF
   join Animal_weight as AW on AF.animal_id = AW.animal_id
)
select dob,
AVG(num)  AS avg_birth_weight_fy,
AVG(num)  AS avg_birth_weight_om
from cte
group by dob;
