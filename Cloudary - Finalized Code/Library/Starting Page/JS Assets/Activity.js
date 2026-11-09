class Activity {
    _userId;
    _userEmail;
    _userActivity;
    _activityTime;

    constructor(userId, userEmail, userActivity, activityTime) {
        this._userId = userId;
        this._userEmail = userEmail;
        this._userActivity = userActivity;
        this._activityTime = activityTime;

    }

    getUserId() { return this._userId; }
    getUserEmail() { return this._userEmail; }
    getUserActivity() { return this._userActivity; }
    getActivityTime() { return this._activityTime; }
    
}