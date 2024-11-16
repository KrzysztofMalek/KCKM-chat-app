import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { create } from 'zustand';
import { db } from './firebase';
import { useUserStore } from '../library/userStore';

const useChatStore = create((set) => ({
  chatId: null,
  user: null,
  isCurrentUserBlocked: false,
  isReceiverBlocked: false,
  changeChat: async (chatId, user) => {
    const currentUser = useUserStore.getState().currentUser;

    try {
      // Pobierz dane użytkownika z Firestore
      const userDocRef = doc(db, 'users', currentUser.id);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const currentUserData = userDocSnap.data();

        // Sprawdzanie, czy aktualny użytkownik jest zablokowany przez odbiorcę
        if (user.blocked.includes(currentUser.id)) {
          return set({
            chatId,
            user: null,
            isCurrentUserBlocked: true,
            isReceiverBlocked: false,
          });
        }

        // Sprawdzanie, czy odbiorca jest zablokowany przez aktualnego użytkownika
        if (currentUserData.blocked.includes(user.id)) {
          return set({
            chatId,
            user,
            isCurrentUserBlocked: false,
            isReceiverBlocked: true,
          });
        }

        // Jeżeli nie ma blokady, ustaw stan czatu
        return set({
          chatId,
          user,
          isCurrentUserBlocked: false,
          isReceiverBlocked: false,
        });
      }
    } catch (error) {
      console.log('Error checking block status:', error);
    }
  },

  changeBlock: async () => {
    const currentUser = useUserStore.getState().currentUser;
    const { user, isReceiverBlocked } = useChatStore.getState();

    try {
      // Zaktualizuj blokadę w bazie danych Firestore
      const userDocRef = doc(db, 'users', currentUser.id);

      await updateDoc(userDocRef, {
        blocked: isReceiverBlocked
          ? arrayRemove(user.id)
          : arrayUnion(user.id),
      });

      // Przełącz blokadę w stanie
      set((state) => ({
        ...state,
        isReceiverBlocked: !state.isReceiverBlocked,
      }));
    } catch (error) {
      console.log('Error updating block status:', error);
    }
  },
}));

export { useChatStore };
