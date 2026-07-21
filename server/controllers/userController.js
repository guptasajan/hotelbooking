

// GET/ api/ user/

export const getUserData = async (req, res) => {
    try {
        const role = req.user.role;
        const recentSearchedCities = req.user.recentSearchedCities;
        res.json({ success: true, role, recentSearchedCities });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}


//Store recent searched cities

// export const storeRecentSearchedCities = async (req, res) => {
//     try {
//         const {recentSearchedCities} = req.body;
//         const user = req.user;

//         if(user.recentSearchedCities.length < 3){
//             user.recentSearchedCities.push(recentSearchedCities);
//         }
//         else {
//             user.recentSearchedCities.shift();
//             user.recentSearchedCities.push(recentSearchedCities);
//         }
//         await user.save();
//         res.json({success: true, message: "City added"});
//     } catch (error) {
//         res.json({success: false, message: error.message});
//     }
// }
export const storeRecentSearchedCities = async (req, res) => {
    try {
        const { city } = req.body;
        const user = req.user;

        if (!city) {
            return res.json({ success: false, message: "City is required" });
        }

        // remove duplicates
        user.recentSearchedCities = user.recentSearchedCities.filter(
            (c) => c !== city
        );

        // add latest first
        user.recentSearchedCities.unshift(city);

        // keep only last 3
        if (user.recentSearchedCities.length > 3) {
            user.recentSearchedCities = user.recentSearchedCities.slice(0, 3);
        }

        await user.save();

        res.json({ success: true, message: "City added" });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};