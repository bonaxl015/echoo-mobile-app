import { submitForgotPasswordForm } from '@services/auth';
import { useMutation } from '@tanstack/react-query';
import { useCallback, useRef, useState } from 'react';
import Toast from 'react-native-toast-message';

export function useForgotPassword() {
	const [isEmailSent, setIsEmailSent] = useState<boolean>(false);
	const [resendTimer, setResendTimer] = useState<number>(0);
	const timerRef = useRef<number>(0);

	const forgotPasswordMutation = useMutation({
		mutationFn: submitForgotPasswordForm,
		onSuccess: (data) => {
			if (data) {
				Toast.show({
					type: 'success',
					text1: 'Email Sent',
					text2: data.message,
					position: 'top'
				});
				setIsEmailSent(true);
				startResendTimer();
			}
		}
	});

	const resendEmailMutation = useMutation({
		mutationFn: submitForgotPasswordForm,
		onSuccess: (data) => {
			Toast.show({
				type: 'success',
				text1: 'Email Sent',
				text2: data?.message,
				position: 'top'
			});
			startResendTimer();
		}
	});

	const startResendTimer = useCallback(() => {
		setResendTimer(30);
		clearInterval(timerRef.current);

		timerRef.current = setInterval(() => {
			setResendTimer((prev) => {
				if (prev <= 1) {
					clearInterval(timerRef.current);

					return 0;
				}

				return prev - 1;
			});
		}, 1000);
	}, []);

	return {
		forgotPasswordMutation,
		resendEmailMutation,
		isEmailSent,
		resendTimer
	};
}
