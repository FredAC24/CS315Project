WITH cte AS (
    SELECT
        AF.animal_id,
        CASE 
            WHEN AW.last_weight ~ '[0-9]' THEN CAST(AW.last_weight AS decimal) -- cast to numeric field
        END AS num,
        CASE 
            WHEN AW.last_weight ~ '[a-zA-Z]' THEN AW.last_weight
        END AS a
    FROM 
        Animal_Facts AS AF
    JOIN
        Animal_weight AS AW ON AF.animal_id = AW.animal_id
)
SELECT 
    AF.dob,
    AVG(num) AS "Avg_Weight",
    percentile_cont(0.5) WITHIN GROUP (ORDER BY num) AS "Median_Weight" 

FROM 
    Animal_Facts AS AF
JOIN 
    cte ON AF.animal_id = cte.animal_id 
GROUP BY 
    AF.dob;