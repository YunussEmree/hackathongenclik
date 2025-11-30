import type {
    Activity,
    GeneralErrorResponse,
    ApiResponse,
} from "../types/api";

export class ApiError extends Error {
    public status: number;
    public errorData: GeneralErrorResponse;

    constructor(
        message: string,
        status: number,
        errorData: GeneralErrorResponse
    ) {
        super(message);
        this.name = "ApiError";
        this.status = status;
        this.errorData = errorData;
    }
}

const API_BASE_URL = import.meta.env.VITE_API_URL || "api";

export const logout = async (): Promise<void> => {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/logout`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    } catch (error) {
        console.error("Error logging out:", error);
        throw error;
    }
};

export const getActivities = async (sortBy?: string): Promise<Activity[]> => {
    try {
        const url = sortBy ? `${API_BASE_URL}/activities/all?sortBy=${sortBy}` : `${API_BASE_URL}/activities/all`;
        const response = await fetch(url, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error("Error fetching activities:", error);
        throw error;
    }
};

export const getLocation = async (location: string): Promise<ApiResponse> => {
    try {
        const response = await fetch(`${API_BASE_URL}/location?location=${location}`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: ApiResponse = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching locations:", error);
        throw error;
    }
};


export const getActivity = async (id: string): Promise<Activity> => {
    try {
        const response = await fetch(`${API_BASE_URL}/activities/${id}`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching activity:", error);
        throw error;
    }
};

export const getUserActivities = async (): Promise<Activity[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}/user/user-activities`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching user activities:", error);
        throw error;
    }
};

export const attendActivity = async (activityId: string, userId: string): Promise<void> => {
    
        console.log(`Attending activity ${activityId} for user ${userId}`);
        const response = await fetch(`${API_BASE_URL}/activities/attend?activityId=${activityId}&userId=${userId}`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            }
        });

        if (!response.ok) {
            if(response.status === 409) throw new Error(`Zaten bu etkinlige katildiniz.`);
            else throw new Error(`HTTP error! status: ${response.status}`);
        }
};

export const getCurrentUser = async (): Promise<{ email: string; id: string; name: string }> => {
    try {
        const response = await fetch(`${API_BASE_URL}/user/current-user`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching current user:", error);
        throw error;
    }
};

export const createActivity = async (activityData: Partial<Activity>): Promise<Activity> => {
    try {
        const response = await fetch(`${API_BASE_URL}/activities`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(activityData),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error creating activity:", error);
        throw error;
    }
};
