select AF.dob,
MIN(AW.last_weight) as MinWeight,
MAX(AW.last_weight) as MaxWeight
from Animal_Facts as AF
join Animal_weight as AW on AF.animal_id = AW.animal_id
group by AF.DOB;