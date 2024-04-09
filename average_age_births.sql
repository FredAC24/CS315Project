select--average age of does that give birth
EXTRACT(YEAR from AF.dob) as birth_year,
EXTRACT(YEAR from CURRENT_DATE)-EXTRACT(year from dob) as avg_age
from Animal_Facts as AF
join Animal_weight as AW on AF.Animal_id = AW.animal_id
where sex = 'Female'
group by EXTRACT(YEAR from AF.dob);


CREATE VIEW FirstYearMoms
   select
   AF.animal_id,
   AW.last_weight,
   AF.DOB
   from Animal_facts as AF
   join Animal_weight as AW on AW.animal_id = AF.animal_id
   where EXTRACT(YEAR from CURRENT_DATE)-EXTRACT(year from AW.DOB)=1;


CREATE VIEW OlderMoms
   select
   AF.animal_id
   AW.last_weight
   AF.DOB
   from Animal_facts as AF
   join Animal_weight as AW on AW.animal_id = AF.animal_id
   where EXTRACT(YEAR from CURRENT_DATE)-EXTRACT(year from AW.DOB)>1;